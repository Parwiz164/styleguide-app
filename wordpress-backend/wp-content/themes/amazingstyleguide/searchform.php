<?php
/**
 * The template for displaying search forms
 *
 * @package amazingstyleguide
 */
?>

<form role="search" method="get" class="navbar-form search-form-right" action="<?php echo esc_url(home_url('/')); ?>">
    <div class="form-group has-feedback">
        <label for="search" class="sr-only hidden">Zoeken</label>
        <div class="input-group">
            <input autofocus="autofocus"  type="search" class="form-control" placeholder="<?php echo esc_attr_x('Zoek &hellip;', 'placeholder', 'amazingstyleguide'); ?>" value="<?php echo esc_attr(get_search_query()); ?>" name="s" title="<?php _ex('Search for:', 'label', 'amazingstyleguide'); ?>">
            <span class="input-group-btn">
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
            </span>
        </div>
    </div>
</form>
