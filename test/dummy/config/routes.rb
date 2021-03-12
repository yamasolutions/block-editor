Rails.application.routes.draw do
  mount BlockEditor::Engine => "/block_editor"
end
