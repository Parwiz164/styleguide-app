<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package amazingstyleguide
 */
?>

<div <?php post_class(); ?>>
        <h1 class="page-title"><?php the_title(); ?></h1>

    <div class="entry-content">
        <div class="entry-content-thumbnail">
            <?php the_post_thumbnail(); ?>
        </div>
        <?php the_content(); ?>
        <?php
        wp_link_pages(array(
            'before' => '<div class="page-links">' . __('Pages:', 'amazingstyleguide'),
            'after'  => '</div>',
        ));
        ?>
    </div>
</div>


