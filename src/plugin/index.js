import MyShare from '../plugin/MyShare'


let $lv, config = {}

config.install = function(Vue, options){
    if(!$lv){
        const plugin = Vue.extend(MyShare)
        $lv = new plugin({
            el: document.createElement('div')
        })
        document.body.appendChild($lv.$el)
    }

    // 初始值，默认是隐藏
    $lv.show = false;

    //定义全局mixin
    let toggle = {
        show(obj){
            $lv.show = true
            $lv.obj = obj
        },
        hide(){
            $lv.hide = false
        }
    }

    if(!Vue.$toggle){
        Vue.$toggle = toggle
    }

    Vue.mixin({
        created(){
            this.$toggle = Vue.$toggle
        }
    })

}



export default config