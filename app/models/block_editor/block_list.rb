module BlockEditor
  # Represents a block list
  class BlockList < ApplicationRecord
    # Associations
    belongs_to :listable, polymorphic: true, touch: true, optional: true

    has_many :inverse_block_list_connections, class_name: "BlockListConnection", foreign_key: "child_id"
    has_many :block_list_connections, foreign_key: 'parent_id'

    has_many :parents, :through => :inverse_block_list_connections
    has_many :reusable_blocks, through: :block_list_connections, source: 'child'

    # Callbacks
    after_save_commit :touch_parents
    after_save_commit :set_reusable_blocks

    # Scopes
    scope :reusable, -> { where(listable_id: nil, listable_type: nil) }

    def reusable?
      listable_type.nil? && listable_id.nil?
    end

    private

    def touch_parents
      parents.touch_all if reusable?
    end

    def set_reusable_blocks
      # TODO: parse the content to find any occurrences of reusable block and grab the IDs
      ids = 2
      self.reusable_block_ids = ids
    end
  end
end
