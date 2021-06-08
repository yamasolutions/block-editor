module BlockEditor
  # Blocks used to render dynamic content
  module Blocks
    # Outputs Instagram block
    class Instagram < Base
      def self.name
        'be/instagram'
      end
    end
  end
end
