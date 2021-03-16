module BlockEditor
  # Blocks used to render dynamic content
  module Blocks
    # Base for dynamic blocks
    class Base
      def self.name
        raise NotImplementedError, 'Must specify block name'
      end

      # Render the block
      def self.render(options = {})
        options = options.reverse_merge(default_options.with_indifferent_access)

        controller.render(
          partial: "block_editor/blocks/#{name}/block",
          locals: { collection: options },
          layout: false
        )
      end

      # Frontend controller used to render views
      def self.controller
        BlockEditor.frontend_parent_controller.constantize
      end

      # Default widget options
      def self.default_options
        {}
      end
    end
  end
end
