import { Input, Button, Dropdown } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hook'
import { setFilter } from '../features/getProduct'

export default function SearchCom() {
  const keyword = useAppSelector(
    (state) => state.products.querySelector.keyword,
  )
  const dispatch = useAppDispatch()

  const [searchContent, setSearchContent] = useState(keyword) //搜索框内容状态
  const [open, setOpen] = useState(false) //历史记录提示框状态
  //定义请求关键字的ref，用于防抖比较
  const keywordRef = useRef(keyword)

  //本地存储搜索历史
  function writeHistory(keyword: string) {
    if (keyword === '') return
    const history_data = localStorage.getItem('searchKeyword') || '[]'
    try {
      let history_list: string[] = JSON.parse(history_data)
      history_list = history_list.filter((item) => item !== keyword)
      history_list.unshift(keyword)

      if (history_list.length > 4) {
        history_list = history_list.slice(0, 4)
      }

      console.log('写入数据', history_list)
      localStorage.setItem('searchKeyword', JSON.stringify(history_list))
    } catch {
      const history_list: string[] = [keyword]
      localStorage.setItem('searchKeyword', JSON.stringify(history_list))
    }
  }

  //读取本地的搜索历史
  function readHistory() {
    const history_data = localStorage.getItem('searchKeyword') || '[]'
    try {
      const history_list: string[] = JSON.parse(history_data)
      return history_list.map((item, index) => {
        return { key: item, label: item }
      })
    } catch {
      return []
    }
  }

  //防抖逻辑
  useEffect(() => {
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
      <Dropdown
        open={open}
        menu={{
          items: readHistory(),
          onClick: ({ key }) => {
            setSearchContent(key)
            writeHistory(key)
            setOpen(false)
          },
        }}
      >
        <Input
          allowClear
          placeholder="关键字搜索"
          value={searchContent}
          onChange={(e) => {
            //删除至空时重新显示
            if (e.target.value === '') setOpen(true)
            setSearchContent(e.target.value)
          }}
          onPressEnter={() => {
            setOpen(false)
            writeHistory(searchContent.trim())
          }}
          onFocus={() => {
            setOpen(true)
          }}
          onBlur={() => {
            // 延时关闭，先执行点击选项再关闭
            setTimeout(() => {
              setOpen(false)
            }, 200)
          }}
          onClear={() => {
            setSearchContent('')
          }}
        />
      </Dropdown>
      <Button
        color="default"
        variant="filled"
        onClick={() => {
          const send_word = searchContent.trim()
          if (send_word !== keywordRef.current) {
            dispatch(setFilter({ keyword: send_word }))
          }
          //按下搜索按钮时写入历史
          writeHistory(searchContent.trim())
        }}
      >
        搜索
      </Button>
    </div>
  )
}
