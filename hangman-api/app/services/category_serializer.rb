class CategorySerializer
	def initialize(category_obj)
		@category = category_obj
	end

	def to_serialized_json
		options = {
			include: {
				subcategories: {
					only: [:id, :name]
				}
			},
			except: [:updated_at, :created_at]
		}
		@category.to_json(options)
	end
end