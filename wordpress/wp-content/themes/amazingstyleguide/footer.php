<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package amazingstyleguide
 */
?>
<footer id="colophon" class="site-footer" role="contentinfo">
<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
                <ul class="copyrights">
                    <li><strong>&copy; <?php echo date("Y"); ?> </strong><?php bloginfo('name'); ?></li>
				</ul>
			</div>
		</div>
	</div><!-- close .container -->
</footer><!-- close #colophon -->

<?php wp_footer(); ?>

</body>
</html>
