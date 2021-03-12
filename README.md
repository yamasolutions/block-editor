# Block Editor for Ruby on Rails
This editor uses packages from the [Wordpress Gutenberg project](https://github.com/WordPress/gutenberg) to build a standalone block editor for Rails. This editor extracted from [Integral CMS](https://github.com/yamasolutions/integral) where it was built following the [Wordpress custom block editor tutorial](https://developer.wordpress.org/block-editor/how-to-guides/platform/custom-block-editor/).

More information;

* [Gutenberg Demo](https://wordpress.org/gutenberg/)
* [Gutenberg Block Editor Developer Documentation](https://developer.wordpress.org/block-editor/)

## Usage
How to use my plugin.

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'block_editor'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install block_editor
```

## Contributing
Contribution are very welcome! Currently the biggest issue that needs to be solved is extensibility. There is no way to modify and configure the editor behaviour (such as blocks to display, block output etc) without forking the engine.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
