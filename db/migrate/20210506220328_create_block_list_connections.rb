class CreateBlockListConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :block_editor_block_list_connections do |t|
      t.belongs_to :parent
      t.belongs_to :child
    end
  end
end
