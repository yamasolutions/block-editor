module BlockEditor
  class BlockListConnection < ApplicationRecord
    belongs_to :parent, class_name: 'BlockEditor::BlockList'
    belongs_to :child, class_name: 'BlockEditor::BlockList'
  end
end
