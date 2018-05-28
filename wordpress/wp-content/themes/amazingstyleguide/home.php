<?php

/**
 *
 *
 * The main blog template file.
 *
 *
 */

get_header(); ?>

<section class="posts-overview">
    <div class="container">
            <div class="row">
                <header>
                    <h1 class="title"><?php echo get_the_title( get_option('page_for_posts', true) ); ?></h1>
                </header>
                <?php if ( have_posts() ) : ?>
                    <?php while ( have_posts() ) : the_post(); ?>
                        <div class="col-xs-12 news-item">
                            <div class="bg-white">
                                <div class="row">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <div class="col-xs-12 col-sm-3">
                                            <div class="news-item-img">
                                                <?php the_post_thumbnail('medium', ['class' => 'img-responsive']); ?>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-9">
                                    <?php else :?>
                                        <div class="col-xs-12">
                                    <?php endif ?>
                                        <div class="news-item-content">
                                            <a href="<?php the_permalink(); ?>"><h4 class="news-item-title"><?php the_title(); ?></h4></a>
                                            <div class="news-item-subtitle"><?php the_excerpt(); ?></div>
                                        </div>
                                    </div>
                                </div>
                                <a href="<?php the_permalink(); ?>" class="clickable"></a>
                            </div>
                        </div>
                    <?php endwhile; ?>

                        <?php pagination_nav(); ?>

                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>