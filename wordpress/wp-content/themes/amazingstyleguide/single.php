<?php
/**
 * The Template for displaying all single posts.
 *
 * @package amazingstyleguide
 */

get_header(); ?>
<section class="single-section">
    <div class="container">
        <div class="row">
            <div id="content" class="col-sm-12 col-md-8">
				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( 'page-templates/content/content', 'single' ); ?>

                    		<?php amazingstyleguide_content_nav( 'nav-below' ); ?>

					<?php
					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || '0' != get_comments_number() ) {
						comments_template();
					}
					?>

				<?php endwhile; // end of the loop. ?>
            </div>
            <div class="sidebar col-sm-12 col-md-4">
				<?php get_sidebar(); ?>
            </div>
        </div>
    </div>
</section>
<?php get_footer(); ?>