class CreateTodosTable < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :name
      t.text :description
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
