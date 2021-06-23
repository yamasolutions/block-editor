module BlockEditor
  # Blocks used to render dynamic content
  module Blocks
    # Outputs Partials
    class Partial < Base
      def self.name
        'be/partial'
      end

      # Render the block
      def self.render(options = {})
        options = options.reverse_merge(default_options.with_indifferent_access)

        controller.render(
          partial: "block_editor/blocks/#{name}/#{options["name"]}",
          locals: { options: options },
          layout: false
        )
      end
    end
  end
end
