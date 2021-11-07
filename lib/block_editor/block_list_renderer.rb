module BlockEditor
  # Handles the rendering of a block list including dynamic blocks and removing HTML comments
  class BlockListRenderer
    # Renders dynamic blocks within the HTML snippet then strips all HTML comments (including Gutenberg markup)
    #
    # @param raw_html [String]
    #
    # @return [String] Parsed content
    def self.render(raw_html)
      html = Nokogiri::HTML::DocumentFragment.parse(raw_html)

      html.search('img').each do |img|
        img.set_attribute('loading', 'lazy')
      end

      # Find & render all instances of a dynamic block (including reusable blocks)
      BlockEditor.dynamic_blocks.each do |dynamic_block|
        dynamic_block = dynamic_block.constantize

        html.search('.//comment()').select {|comment| comment.inner_text.starts_with?(" wp:#{dynamic_block.name}") }.each do |block_instance|
          block_attributes = block_instance.inner_text.split(" wp:#{dynamic_block.name}")[1][0...-1]
          block_attributes = block_attributes.blank? ? {} : JSON.parse(block_attributes)
          block_content = render_block(dynamic_block, block_attributes)

          block_instance.replace(block_content)
        end
      end

      html.search('.//comment()').remove
      html.to_s.html_safe
    end

    # Renders a specific block using the provided options
    #
    # @param block [String] name of block
    # @param options [Hash] block options to use when rendering
    #
    # @return [String] block content (HTML)
    def self.render_block(block, options)
      block.render(options)
    rescue StandardError => e
      respond_with_block_error(e)
    end

    # Handles block errors
    def self.respond_with_block_error(error)
      Rails.logger.error("Error rendering block - #{error.message}")
      ''
    end
  end
end


