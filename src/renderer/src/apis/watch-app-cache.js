export default function dispatch_app_data_cache() {
    const cache_set_item = localStorage.setItem
    localStorage.setItem = function (key, val) {
        let event = new Event('setCacheEvent')
        event.key = key
        event.newValue = val
        window.dispatchEvent(event)
        cache_set_item.apply(this, arguments)
    }
}
