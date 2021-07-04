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
    before_validation :set_defaults

    # Validations
    validates :name, presence: true

    # Scopes
    scope :reusable, -> { where(listable_id: nil, listable_type: nil) }
    scope :search, ->(query) { where('lower(name) LIKE ?', "%#{query.downcase}%") }

    def self.with_block(block)
      all.select { |bl| Nokogiri::HTML::DocumentFragment.parse(bl.content).search('.//comment()').select {|comment| comment.inner_text.starts_with?(" wp:#{block}") }.any? }
    end

    def reusable?
      listable_type.nil? && listable_id.nil?
    end

    private

    def touch_parents
      parents.touch_all if reusable?
    end

    def set_reusable_blocks
      # Find all instances of a reusable block
      html = Nokogiri::HTML(content)
      ids = html.xpath('//comment()').select {|comment| comment.inner_text.starts_with?(" wp:#{BlockEditor::Blocks::Reusable.name}") }.map do |block_instance|
        block_attributes = block_instance.inner_text.split(" wp:#{BlockEditor::Blocks::Reusable.name}")[1][0...-1]
        block_attributes = block_attributes.blank? ? {} : JSON.parse(block_attributes)
        block_attributes['ref']
      end

      self.reusable_block_ids = ids || []
    end

    def set_defaults
      if self.name.blank?
        self.name = Time.now
      end
    end
  end
end
