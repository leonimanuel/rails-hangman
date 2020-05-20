class SubcategorySerializer
	def initialize(subcategory_obj)
		@subcategory = subcategory_obj
	end

	def to_serialized_json
		options = {
			include: {
				phrases: {
					only: [:id, :content, :hint, :subcategory_id],
					include: {
						subcategory: {
							except: [:created_at, :updated_at]
						}
					}
				}
			},
			except: [:updated_at, :created_at]
		}
		@subcategory.to_json(options)
	end
end