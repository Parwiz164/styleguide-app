<?php
/**
 * Navigation BAR
 *
 */
?>

<nav class="navbar navbar-default">
    <div class="container navbar-wrapper">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only"><?php _e('Toggle navigation', 'amazingstyleguide') ?> </span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!--  Search button          -->
            <button class="navbar-toggle btn btn-lg" type="button" data-toggle="collapse" data-target="#searchbox">
                <span class="sr-only">Toggle navigation</span>
                <i class="fa fa-search"></i>
            </button>
            <a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home"><?php echo esc_attr(get_bloginfo('name', 'display')); ?></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right navbar-search hidden-xs">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-search"></i></a>
                    <ul class="dropdown-menu dropdown-search" style="padding:12px;">
                        <li><?php get_search_form(); ?></li>
                    </ul>
                </li>
            </ul>
            <?php wp_nav_menu(
                array(
                    'theme_location'  => 'primary',
                    'depth'           => 2,
                    'container'       => '',
                    'container_id'    => '',
                    'container_class' => '',
                    'menu_class'      => 'nav navbar-nav navbar-default',
                    'fallback_cb'     => 'amazing_wp_bootstrap_navwalker::fallback',
                    'menu_id'         => 'main-menu',
                    'walker'          => new amazing_wp_bootstrap_navwalker()
                )
            ); ?>
        </div><!-- /.navbar-collapse -->
        <div class="collapse navbar-collapse" role="navigation" id="searchbox">
            <ul class="nav navbar-nav navbar-right visible-xs">
                <li><?php get_search_form(); ?></li>
            </ul>
        </div>
    </div>
</nav>
