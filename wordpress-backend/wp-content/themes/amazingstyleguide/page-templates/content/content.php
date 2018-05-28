<?php
/**
 * @package amazingstyleguide
 */
?>

<div <?php post_class(); ?>>

    <h2 class="page-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>

    <?php if (is_search() || is_archive()) : // Only display Excerpts for Search and Archive Pages ?>
        <div class="short-description">
            <?php the_excerpt(); ?>
        </div>
    <?php else : ?>
        <div class="content">
            <?php the_excerpt(); ?>
            <a href="<?php the_permalink(); ?>"><?php __('Continue reading <span class="meta-nav">&rarr;</span>', 'amazingstyleguide'); ?></a>
        </div>
    <?php endif; ?>

</div>