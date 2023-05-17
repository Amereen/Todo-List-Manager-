class Todo < ActiveRecord::Base
  enum status: [:waiting, :progress, :done]

  belongs_to :category
end