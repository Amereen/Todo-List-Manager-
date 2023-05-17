Category has a has_many association with Todo model, which means that one category can have many todos associated with it.

Todo model has a belongs_to association with Category model, which means that each todo belongs to a category.

Todo model also has an enum defined on the status attribute, which means that the status of each todo can be one of the three values - :waiting, :progress, or :done. This helps to keep track of the progress of a todo item.