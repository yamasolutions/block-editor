module BlockEditor
  # Blocks used to render dynamic content
  module Blocks
    # Outputs Contact Form block
    class ContactForm < Base
      def self.name
        'be/contact-form'
      end
    end
  end
end
