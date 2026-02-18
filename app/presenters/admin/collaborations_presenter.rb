# frozen_string_literal: true

class Admin::CollaborationsPresenter
  include Rails.application.routes.url_helpers

  def initialize(user:, product:)
    @user = user
    @product = product
  end

  def props
    collaborator = product.confirmed_collaborator
    product_affiliate = product.product_affiliates.find_by(affiliate: collaborator)

    {
      external_id: product.external_id,
      name: product.name,
      long_url: product.long_url,
      unique_permalink: product.unique_permalink,
      price_formatted: product.price_formatted,
      preview_url: product.preview_url,
      cover_placeholder_url: ActionController::Base.helpers.asset_url("cover_placeholder.png"),
      commission_percent: product.percentage_revenue_cut_for_user(user),
      collaboration_started_at: (product_affiliate&.created_at || collaborator&.created_at)&.iso8601,
      seller: {
        external_id: product.user.external_id,
        name: product.user.display_name
      },
      sales_count: product.successful_sales_count,
      total_earnings_cents: product.total_usd_cents_earned_by_user(user)
    }
  end

  private
    attr_reader :user, :product
end
