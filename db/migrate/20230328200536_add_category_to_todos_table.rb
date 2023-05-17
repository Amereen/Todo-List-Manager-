class AddCategoryToTodosTable < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :category_id, :integer
  end
end
