export class Job  {
  public id: number = 0
  public userId: number = 0
  public logo: string = ''
  public title: string=''
  public company: string=''
  public location: string=''
  public description: string=''
}

export class Search  {
  public id: number = 0
  public title: string = ''
  public count: number = 0
  public location: string = ''
  public alertOn: boolean = false
}

export class Article  {
  public id: number = 0
  public title: string = ''
  public image: string = ''
  public views: number = 0
}

export class User {
  public id: number = 0
  public name: string = ''
  public title: string = ''
  public avatar: string = ''
}

export class Post  {
  public id: number = 0
  public author: User = new User()
  public time: string= ''
  public content: string= ''
  public image?: string= ''
  public likes: number = 0
  public comments: number = 0
}

