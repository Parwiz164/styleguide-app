<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package amazingstyleguide
 */

get_header(); ?>

<section class="404-error">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <div class="page-intro text-center">
                    <h1 class="page-title">
                        <?php _e('Oops! Something went wrong here.', 'amazingstyleguide'); ?>
                    </h1>
                    <div class="body">
                        <?php _e('Nothing could be found at this location. Maybe try a search?', 'amazingstyleguide'); ?>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                <div class="searchbar">
                    <?php get_search_form(); ?>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>





