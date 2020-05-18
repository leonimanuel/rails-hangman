class SubcategoriesController < ApplicationController
	def show
		subcategory = Subcategory.find(params[:id])
		render json: SubcategorySerializer.new(subcategory).to_serialized_json
	end
end
