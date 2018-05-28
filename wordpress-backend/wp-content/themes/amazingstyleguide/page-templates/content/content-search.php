<?php
/**
 * @package amazingstyleguide
 */
?>

<div class="searchresult-item">
    <div class="media">
        <?php if (has_post_thumbnail()) : ?>
            <div class="media-left">
                <?php the_post_thumbnail('medium', ['class' => 'img-responsive']); ?>
            </div>
        <?php endif; ?>

        <div class="media-body">
            <h2 class="media-heading"><?php the_title(); ?></h2>
            <?php the_excerpt(); ?>
        </div>
        <a href="<?php the_permalink(); ?>" class="clickable"></a>
    </div>
</div>