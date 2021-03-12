module BlockEditor
  # Represents a block list
  class BlockList < ApplicationRecord
    # Associations
    belongs_to :listable, polymorphic: true, touch: true
  end
end
