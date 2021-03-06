class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :text
      t.boolean :isCompleted
      t.references :project, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
