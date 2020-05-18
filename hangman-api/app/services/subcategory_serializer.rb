class SubcategorySerializer
	def initialize(subcategory_obj)
		@subcategory = subcategory_obj
	end

	def to_serialized_json
		options = {
			include: {
				phrases: {
					only: [:id, :content, :hint]
				}
			},
			except: [:updated_at, :created_at]
		}
		@subcategory.to_json(options)
	end
end