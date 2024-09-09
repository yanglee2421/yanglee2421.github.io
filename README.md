# React Transition

## Deference

|         类型          | 常规 | 过渡 |
| :-------------------: | :--: | :--: |
|      能否被打断       |  是  |  否  |
| 计算队列中允许promise |  否  |  是  |

## Note

1. 更新状态
2. 根据新状态生成组件函数队列
3. 开始Pending，执行组件函数队列
4. 如果执行过程中遇到(没有被suspense包裹的)Promise或是被其它更新打断
5. 如果是Promise，则Promise兑现后，回到第2步
6. 如果是其它更新，则直接回到第2步
7. 函数队列计算完成得出结果，结束Pending
8. 将计算结果提交到屏幕
