# frozen_string_literal: true

class Admin::Users::CollaborationsController < Admin::Users::BaseController
  include Pagy::Backend

  before_action :fetch_user

  COLLABORATIONS_PER_PAGE = 10

  def index
    set_meta_tag(title: "#{@user.display_name} collaborations on Gumroad")

    pagination, products = pagy(
      @user.collaborating_products
        .includes(:user, product_affiliates: :affiliate)
        .order(created_at: :desc),
      page: params[:page],
      limit: params[:per_page] || COLLABORATIONS_PER_PAGE
    )

    collaborations = products.map do |product|
      Admin::CollaborationsPresenter.new(user: @user, product:).props
    end

    render inertia: "Admin/Users/Collaborations/Index",
           props: {
             user: { external_id: @user.external_id },
             collaborations:,
             pagination: PagyPresenter.new(pagination).props,
             is_affiliate_user: @user.directly_affiliated_products.exists?
           }
  end
end
