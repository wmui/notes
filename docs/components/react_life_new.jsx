import React from 'react'
import ReactDOM from 'react-dom'

class Count extends React.Component{
    state = {count:0}

    constructor(props){
        console.log('Count---constructor');
        super(props)
        //初始化状态
    }
    //加1按钮的回调
    add = ()=>{
        //获取原状态
        const {count} = this.state
        //更新状态
        this.setState({count:count+1})
    }

    //卸载组件按钮的回调
    death = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    //强制更新按钮的回调
    force = ()=>{
        this.forceUpdate()
    }
    
    
    // 初始挂载执行一次，props/state改变n次，执行1+n次
    // 强制更新也会执行
    static getDerivedStateFromProps(props,state){
        console.log('getDerivedStateFromProps',props,state);
        return null
    }

    // 获取上次的更新快照，数据被componentDidUpdate钩子的最后一个参数接受
    // 初始时没有上次的快照，只要有快照就会执行。强制更新也会执行
    getSnapshotBeforeUpdate(){
        console.log('getSnapshotBeforeUpdate');
        return 'hello'
    }

    //组件挂载完毕的钩子
    componentDidMount(){
        console.log('Count---componentDidMount');
    }

    //组件将要卸载的钩子
    componentWillUnmount(){
        console.log('Count---componentWillUnmount');
    }

    //控制组件更新的“阀门”
    shouldComponentUpdate(){
        console.log('Count---shouldComponentUpdate');
        return true
    }

    //组件更新完毕的钩子
    componentDidUpdate(preProps,preState,snapshotValue){
        console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
    }
    
    render(){
        console.log('Count---render');
        const {count} = this.state
        return(
            <div>
                <h2>当前求和为：{count}</h2>
                <button onClick={this.add}>点我+1</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.death}>卸载组件</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
            </div>
        )
    }
}

class Demo extends React.Component {
    state = {
        count: 0,
    }
    
     change = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={ this.change}>click</button>
                <Count count={this.state.count}/>
            </div>
        )
    }
}

export default Demo