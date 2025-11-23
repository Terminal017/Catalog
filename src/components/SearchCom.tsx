import { Input, Button } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hook'
import { setFilter } from '../features/getProduct'

export default function SearchCom() {
  const keyword = useAppSelector(
    (state) => state.products.querySelector.keyword,
  )
  const dispatch = useAppDispatch()
  const [searchContent, setSearchContent] = useState(keyword)
  //定义请求关键字的ref，用于防抖比较
  const keywordRef = useRef(keyword)

  //防抖逻辑
  useEffect(() => {
    console.log('发送搜索请求===>', searchContent.trim() === '')
    const send_time = setTimeout(() => {
      const send_word = searchContent.trim()
      //防止重复发送
      if (send_word !== keywordRef.current) {
        dispatch(setFilter({ keyword: send_word }))
        keywordRef.current = send_word
      }
    }, 500)
    //变化时清理未执行的定时器
    return () => clearTimeout(send_time)
  }, [searchContent, dispatch])

  return (
    <div className="w-full p-2 flex flex-row gap-2">
      <Input
        placeholder="关键字搜索"
        value={searchContent}
        onChange={(e) => {
          setSearchContent(e.target.value)
        }}
      />
      <Button
        color="default"
        variant="filled"
        onClick={() => {
          const send_word = searchContent.trim()
          if (send_word !== keywordRef.current) {
            dispatch(setFilter({ keyword: send_word }))
          }
        }}
      >
        搜索
      </Button>
    </div>
  )
}
