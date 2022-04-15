const ICONS =
  'arrow-up,arrow-down,arrow-left,arrow-right,books,bullhorn,cat,compass,crown,equalizer,eye,fire,gift,hammer,heart,info,library,pencil,quill,search,stack,star,super-star,sword,trophy,user,warning'.split(
    ','
  )

const icon = {
  title: 'Icon',
  name: 'icon',
  type: 'string',
  options: { list: ICONS },
}

export default icon
