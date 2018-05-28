<?php

/**
 * =================================   Woocommerce section  START   ===========================================
 */

/**
 * Check if WooCommerce is active
 * if so load custom Woocommerce settings
 */
// Add new constant that returns true if WooCommerce is active
define( 'WPEX_WOOCOMMERCE_ACTIVE', class_exists( 'WooCommerce' ) );

//
if ( WPEX_WOOCOMMERCE_ACTIVE ) {

	// Add WooCommerce theme Support
	add_action( 'after_setup_theme', function() {
		add_theme_support( 'woocommerce' );
	});

	// Remove sidebar
//    remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

	// Remove breadcrumbs
	add_action( 'init', 'remove_wc_breadcrumbs' );
	function remove_wc_breadcrumbs() {
		remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
	}

	// Change Woocommerce BEFORE main content
	remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
	function before_content() { ?>
		<div class="woocommerce-products">
	<?php }
	add_action( 'woocommerce_before_main_content', 'before_content', 10 );

	// Change Woocommerce AFTER main content
	remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
	function after_content() { ?>
		</div><!--Close col-->
	<?php }
	add_action('woocommerce_after_main_content', 'after_content', 10);

	// Increase producten per row on products page
	add_filter('loop_shop_columns', 'loop_columns');
	if (!function_exists('loop_columns')) {
		function loop_columns() {
			return 3; // 3 products per row
		}
	}

	//  Display 12 products per page
	add_filter( 'loop_shop_per_page', create_function( '$cols', 'return 12;' ), 20 );

	// Remove related products
	function wc_remove_related_products( $args ) {
		return array();
	}
	add_filter('woocommerce_related_products_args','wc_remove_related_products', 10);

	// Remove price sorting options
	function remove_price_ordering( $orderby ) {
		unset($orderby["price"]);
		unset($orderby["price-desc"]);
		return $orderby;
	}
	add_filter( "woocommerce_catalog_orderby", "remove_price_ordering", 20 );


	//Adding Alphabetical sorting option to shop and product settings pages
	function alphabetical_product_ordering( $sort_args ) {
		$orderby_value = isset( $_GET['orderby'] ) ? woocommerce_clean( $_GET['orderby'] ) : apply_filters( 'woocommerce_default_catalog_orderby', get_option( 'woocommerce_default_catalog_orderby' ) );
		if ( 'alphabetical' == $orderby_value ) {
			$sort_args['orderby'] = 'title';
			$sort_args['order'] = 'asc';
			$sort_args['meta_key'] = '';
		}
		return $sort_args;
	}
	add_filter( 'woocommerce_get_catalog_ordering_args', 'alphabetical_product_ordering' );

	function custom_wc_catalog_orderby( $sortby ) {
		$sortby['alphabetical'] = __('Sort by Name: Alphabetical', 'amazingstyleguide');
		return $sortby;
	}
	add_filter( 'woocommerce_default_catalog_orderby_options', 'custom_wc_catalog_orderby' );
	add_filter( 'woocommerce_catalog_orderby', 'custom_wc_catalog_orderby' );




	// Woocommerce rating stars always
	add_filter('woocommerce_product_get_rating_html', 'always_rating', 10, 2);

	function always_rating($rating_html, $rating) {
		$title ='';
		if ( $rating > 0 ) {
			$title = sprintf( __( 'Rated %s out of 5', 'woocommerce' ), $rating );
		}

		$rating_html  = '<div class="star-rating" title="' . $title . '">';
		$rating_html .= '<span style="width:' . ( ( $rating / 5 ) * 100 ) . '%"><strong class="rating">' . $rating . '</strong> ' . __( 'out of 5', 'woocommerce' ) . '</span>';
		$rating_html .= '</div>';
		return $rating_html;
	}

	/* Show pagination on the top of shop page */
//    add_action( 'woocommerce_before_shop_loop', 'woocommerce_pagination', 10 );


	//   Remove pre header blocks
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30);
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20);

	// define the woocommerce_before_shop_loop callback
	function custom_woocommerce_before_shop_loop(  ) {
		echo '<div class="woocommerce-sorting">';
		woocommerce_result_count();
		woocommerce_pagination();
		woocommerce_catalog_ordering();
		echo '</div>';
	};

// add the action
	add_action( 'woocommerce_before_shop_loop', 'custom_woocommerce_before_shop_loop', 10, 0 );
}



/**
 * =================================   Woocommerce section  End   ===========================================
 */
?>