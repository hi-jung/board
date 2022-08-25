import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "../vo/board.vo";

@Entity("TB_BOARD", { schema: "service" })
export class TbBoard {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "TB_ID",
    comment: "게시글 아이디",
    unsigned: true,
  })
  tbId: string;

  @Column("varchar", { name: "TB_TITLE", comment: "제목", length: 200 })
  tbTitle: string;

  @Column("text", { name: "TB_CONTENT", nullable: true, comment: "내용" })
  tbContent: string | null;

  @Column("varchar", { name: "TB_USERNAME", comment: "작성자", length: 20 })
  tbUsername: string;

  @Column("datetime", {
    name: "TB_REGIST_DATE",
    nullable: true,
    comment: "등록일",
  })
  tbRegistDate: Date | null;

  @Column("datetime", {
    name: "TB_UPDATE_DATE",
    nullable: true,
    comment: "수정일",
  })
  tbUpdateDate: Date | null;

  @Column("varchar", { name: "TB_PASSWORD", comment: "비밀번호", length: 100 })
  tbPassword: string;

  constructor(board: Board) {
    this.tbUsername = board.username;
    this.tbPassword = board.password;
    this.tbTitle = board.title;
    this.tbContent = board.content;
    this.tbRegistDate = board.registDate;
    this.tbUpdateDate = board.updateDate;
  }
}
