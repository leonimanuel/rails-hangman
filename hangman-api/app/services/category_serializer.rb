class CategorySerializer
	def initialize(category_obj)
		@category = category_obj
	end

	def to_serialized_json
		@category.to_json
	end
end