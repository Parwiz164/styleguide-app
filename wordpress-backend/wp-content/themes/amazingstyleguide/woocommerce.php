<?php
/**
 * The template for displaying Archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package amazingstyleguide
 */

get_header(); ?>
<section class="shop-section">
	<div class="container">
		<div class="row">
			<div id="content" class="col-sm-8">
				<?php woocommerce_content(); ?>
			</div>
			<div class="col-sm-4">
				<?php woocommerce_get_sidebar(); ?>
			</div>
		</div>
	</div>
</section>
<?php get_footer(); ?>
