<?php
/**
 * @package amazingstyleguide
 */
?>


<div <?php post_class(); ?>>
    <h1 class="page-title"><?php the_title(); ?></h1>

    <div class="single-post-image">
        <div class="entry-content-thumbnail">
            <?php the_post_thumbnail(); ?>
        </div>
        <div class="single-post-content">
            <?php the_content(); ?>
        </div>
    </div>
</div>