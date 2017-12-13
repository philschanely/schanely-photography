<?php get_header(); ?>
    <main>
        <?php if (have_posts()) :?>
            <ul class="article-list flex-tile">
            <?php while(have_posts()) : the_post(); ?>
                <li>
                    <a href="<?php the_permalink(); ?>" class="blog-hook">
                        <div class="blog-hook__cover">
                            <?php if ( has_post_thumbnail() ) {
                                the_post_thumbnail('post-thumbnail');
                            } ?>
                        </div>
                        <div class="blog-hook__lead-in">
                            <h2><?php the_title(); ?></h2>
                            <p class="article-date"><?php echo get_the_date('M d, Y'); ?></p>
                            <div class="content">
                                <?php the_excerpt(); ?>
                                <p class="btn btn-read-more">Read more &raquo;</p>
                            </div>
                        </div>
                    </a>
                </li>
            <?php endwhile; ?>
            </ul>
        <?php else : ?>
            <p>Page not found.</p>
        <?php endif; ?>
    </main>
<?php get_footer(); ?>