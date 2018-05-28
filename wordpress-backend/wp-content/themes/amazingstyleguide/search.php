<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package amazingstyleguide
 */

get_header(); ?>
<?php // substitute the class "container-fluid" below if you want a wider content area ?>
<section class="search-results">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                <?php if ( have_posts() ) : ?>
                    <h1 class="page-title"><?php printf( __( 'Search Results for: %s', 'amazingstyleguide' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
                    <?php while ( have_posts() ) : the_post(); ?>
                        <?php get_template_part( '/page-templates/content/content', 'search' ); ?>
                    <?php endwhile; ?>
                <?php else : ?>
                    <?php get_template_part( 'no-results', 'search' ); ?>
                <?php endif; // end of loop. ?>

            </div><!-- close .*-inner (main-content or sidebar, depending if sidebar is used) -->
            <div class="col-xs-12 text-center">
                <?php pagination_nav(); ?>
            </div>
        </div>
    </div>
</section>
<?php get_footer(); ?>





