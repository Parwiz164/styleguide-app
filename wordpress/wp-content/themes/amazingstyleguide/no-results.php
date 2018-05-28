<?php
/**
 * The template part for displaying a message that posts cannot be found.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package amazingstyleguide
 */
?>

<section class="no-results not-found">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-8">
                <h1 class="page-title"><?php _e('Nothing Found', 'amazingstyleguide'); ?></h1>

                <?php if (is_home() && current_user_can('publish_posts')) : ?>

                    <p><?php printf(__('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'amazingstyleguide'), esc_url(admin_url('post-new.php'))); ?></p>

                <?php elseif (is_search()) : ?>

                    <p><?php _e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'amazingstyleguide'); ?></p>

                <?php else : ?>

                    <p><?php _e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'amazingstyleguide'); ?></p>

                <?php endif; ?>

                <?php dynamic_sidebar('custom_search_sidebar'); ?>
            </div>
        </div>
    </div>
</section><!-- .no-results -->
