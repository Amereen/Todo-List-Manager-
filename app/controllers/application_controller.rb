class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  # Index route for todos
  get '/todos' do
    todos = Todo.all

    if todos.empty?
      status 404
      { error: "No todos found" }.to_json
    else
      todos.to_json
    end
  end

  # Show route for a single todo
  get '/todos/:id' do
    todo = Todo.find(params[:id])
    todo.to_json
  end

  # Create route for todos
  post '/todos' do
    todo = Todo.new(params)
    if todo.save
      todo.to_json
    else
      halt 422, todo.errors.to_json
    end
  end

  # Update route for a single todo
  patch '/todos/:id' do
    todo = Todo.find(params[:id])
    if todo.update(params)
      todo.to_json
    else
      halt 422, todo.errors.to_json
    end
  end

  # Delete route for a single todo
  delete '/todos/:id' do
    todo = Todo.find(params[:id])
    if todo.destroy
    else
      halt 500
    end
  end

  # Index route for categories
  get '/categories' do
    categories = Category.all
    if categories.empty?
      status 404
      { error: "No categories found" }.to_json
    else
      categories.to_json
    end
  end

  # Show route for a single category
  get '/categories/:id' do
    # Find the category by ID
    category = Category.find(params[:id])
  
    # Retrieve all associated todos
    todos = category.todos
  
    # Construct the nested JSON data
    category_with_todos = {
      id: category.id,
      name: category.name,
      todos: todos.map { |todo| { id: todo.id, name: todo.name, description: todo.description} }
    }
  
    # Convert the data to JSON and return the response
    category_with_todos.to_json
  end

  # Create route for categories
  post '/categories' do
    category = Category.new(params)
    if category.save
      category.to_json
    else
      halt 422, category.errors.to_json
    end
  end

  # Update route for a single category
  patch '/categories/:id' do
    category = Category.find(params[:id])
    if category.update(params)
      category.to_json
    else
      halt 422, category.errors.to_json
    end
  end

  # Delete route for a single category
  delete '/categories/:id' do
    category = Category.find(params[:id])
    if category.destroy
    else
      halt 500
    end
  end

  delete '/todos/category/:category_id' do
    Todo.where(category_id: params[:category_id]).destroy_all
    { message: "Todos Refresh" }.to_json
  end

end
