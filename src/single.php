<?php get_header(); ?>
<main class="page-article__main">
  <?php if (have_posts()) :?>
    <?php while(have_posts()) : the_post(); ?>
      <?php $custom_fields = get_post_custom($post_id); ?>
      <h2><?php the_title(); ?></h2>
      <p class="article-date"><?php echo get_the_date('M d, Y'); ?></p>
      <?php the_content(); ?>
      <?php if (array_key_exists('blog-c2a-prompt', $custom_fields)) : ?>
        <p class="lead"
           style="text-align:center;">
          <?php echo $custom_fields['blog-c2a-prompt'][0]; ?>
        </p>
      <?php endif; ?>
      <?php if (array_key_exists('blog-c2a-button', $custom_fields)) : ?>
        <a class="btn" style="width: 200px; margin: 0 auto; display: block;"
           href="http://schanelyphotography.com/contact/">
            <?php echo $custom_fields['blog-c2a-button'][0]; ?> &raquo;
        </a>
      <?php endif; ?>
    <?php endwhile; ?>
  <?php else : ?>
    <p>Page not found.</p>
  <?php endif; ?>
</main>
<?php get_footer(); ?>
