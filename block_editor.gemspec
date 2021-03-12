require_relative "lib/block_editor/version"

Gem::Specification.new do |spec|
  spec.name        = "block_editor"
  spec.version     = BlockEditor::VERSION
  spec.authors     = ["Patrick Lindsay"]
  spec.email       = ["ptrick@yamasolutions.com"]
  spec.homepage    = "https://github.com/yamasolutions/block-editor"
  spec.summary     = "Ruby on Rails Block Editor"
  spec.description = "WYSIWYG editor but much better.."
  spec.license     = "MIT"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/yamasolutions/block-editor"
  spec.metadata["changelog_uri"] = "https://github.com/yamasolutions/block-editor/blob/master/CHANGELOG.md"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 6.0"
  spec.add_dependency 'webpacker', '~> 5.1'
end
