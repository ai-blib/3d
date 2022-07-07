import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MediaCard from '../../components/MediaCard/index';
import Grid from '@mui/material/Grid';
import cityImage from './images/city.png';
import panoramicImage from './images/panoramic.png';
import metaImage from './images/meta.png';
import earthImage from './images/earth.png';
import cellImage from './images/cell.png';
import lunarImage from './images/lunar.png';
import zeldaImage from './images/zelda.png';
import zeldaMapImage from './images/zelda_map.png';
import scanImage from './images/scan.png';
import carImage from './images/car.png';
import developingImage from './images/developing.png';
import segmentFaultImage from './images/segmengfault.png';
import humanImage from './images/human.png';
import olympicImage from './images/olympic.png';
import comicImage from './images/comic.png';
import floatingImage from './images/floating.png';
// import lowployImage from './images/lowploy.png';
import liveImage from './images/live.png';
import ringImage from './images/ring.png';
import first from './images/first.png'
import s2 from './images/2.png';
import s3 from './images/img3.png';
import s4 from './images/img4.png';
import s5 from './images/img5.png';
import s6 from './images/img6.png';
import s7 from './images/img7.png';
import s8 from './images/img8.png';

import './index.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const workList = [
  {
    link: 'https://f1ixt.csb.app/',
    title: '首页',
    description: '首页 【⚠优化中】',
    image: first,
    three: true
  },
  {
    link: 'https://mbfzf.csb.app/',
    title: '云彩',
    description: '云彩 【⚠优化中】',
    image: s2,
    three: true
  },
  {
    link: 'https://5xho4.csb.app/',
    title: '草原',
    description: '草原 【⚠优化中】',
    image: s3,
    three: true
  },
  {
    link: 'https://6hi1y.csb.app/',
    title: '3D开关',
    description: '3D开关【⚠优化中】',
    image: s4,
    three: true
  },
  {
    link: 'https://sbf2i.csb.app/',
    title: '动画数字',
    description: '动画数字【⚠优化中】',
    image: s5,
    three: true
  },
  {
    link: 'https://prb9t.csb.app/',
    title: '动画房间',
    description: '动画房间【⚠优化中】',
    image: s6,
    three: true
  },
  {
    link: 'https://gkfhr.csb.app/#',
    title: '黄昏',
    description: '黄昏【⚠优化中】',
    image: s7,
    three: true
  },
  {
    link: 'https://n60qg.csb.app/',
    title: '3D鞋子',
    description: '3D鞋子【⚠优化中】',
    image: s8,
    three: true
  },
  {
    link: '#/olympic',
    title: '2022冬奥会3D趣味页面',
    description: '🐼 萌萌的冰墩墩和雪容融送给大家！',
    image: olympicImage,
    three: true
  },
  {
    link: '#/ring',
    title: '艾尔登法环Logo',
    description: '🔥 火焰效果老头环logo？',
    image: ringImage,
    three: true
  },
  {
    link: '#/floating',
    title: '悬浮文字',
    description: '🎋 Fantastic floating text',
    image: floatingImage,
    three: true
  },
  {
    link: '#/comic',
    title: '3D漫画',
    description: '🕷 spider man',
    image: comicImage,
    three: true
  },
  {
    link: '#/city',
    title: '数字城市',
    description: '🏙 3D数字城市 【⚠优化中】',
    image: cityImage,
    three: true
  },
  {
    link: '#/lunar',
    title: '虎年春节创意',
    description: '🐅 2022虎虎生威！',
    image: lunarImage,
    three: true
  },
  {
    link: '#/segmentfault',
    title: 'SegmentFault突破1000粉纪念',
    description: '🏆 1000+ followers ！',
    image: segmentFaultImage,
    three: true
  },
  {
    link: '#/live',
    title: '虚拟主播',
    description: '💃 虚拟主播初音未来【⚠优化中】',
    image: liveImage,
    three: true
  },
  {
    link: '#/earth',
    title: '地球',
    description: '🌏 尽情探索3D Low Poly数字地球吧！【⚠优化中】',
    image: earthImage,
    three: true
  },
  {
    link: '#/cell',
    title: '动植物细胞结构',
    description: '👻 可以查看动物细胞和植物细胞的内部组成结构。【⚠优化中】',
    image: cellImage,
    three: true
  },
  {
    link: '#/car',
    title: 'Lamborghini Centenario LP-770',
    description: '📷车辆模型展示【⚠优化中】',
    image: carImage,
    three: true
  },
  {
    link: '#/zelda',
    title: '塞尔达：旷野之息3D',
    description: '📷 林克【⚠优化中】',
    image: zeldaImage,
    three: true
  }
];

export default class Home extends React.Component {
  render () {
    return (
      <div className="home" style={{ padding: '24px'}}>
        <Box>
          <h1 className="page_title">3D Example List</h1>
        </Box>
        <Box sx={{ width: '100%' }} style={{ maxWidth: '1200px', margin: 'auto' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {workList.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Item elevation={0} className="grid_item">
                  {item.three ? (<i className="three_logo"></i>) : '' }
                  <MediaCard link={item.link} title={item.title} image={item.image} description={item.description} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    )
  }
}
