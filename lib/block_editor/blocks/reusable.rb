module BlockEditor
  # Blocks used to render dynamic content
  module Blocks
    # Outputs Reusable block
    class Reusable < Base
      def self.name
        'block'
      end

      # Render the block
      def self.render(options = {})
        BlockListRenderer.render(BlockEditor::BlockList.find(options['ref']).content)
      end
    end
  end
end
