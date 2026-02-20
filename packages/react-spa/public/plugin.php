<?php
/*
Plugin Name: Vite Wordpress
Plugin URI: https://gitee.com/Swz082421/wordpress-vite
Description: Wordpress plugin for vite
Author: YangLee
Author URI: https://gitee.com/Swz082421
Version: 1.0.0
*/

function load_assets($hook)
{
    $ver = '0.0.1';
    wp_enqueue_style('vite', plugin_dir_url(__FILE__) . 'dist/assets/index.css', array(), $ver, false);
    wp_enqueue_script('vite', plugin_dir_url(__FILE__) . 'dist/assets/wp-vite-main.js', array(), $ver, true);
}

add_action('admin_enqueue_scripts', 'load_assets');
add_action('wp_enqueue_scripts', 'load_assets');

function to_script_module($tag, $handle)
{
    if (strpos($tag, 'vite-main.js') !== false) {
        $tag = str_replace('<script', '<script type="module"', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'to_script_module', 10, 2);
