import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TB_REPLY", { schema: "service" })
export class TbReply {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "TR_ID",
    comment: "댓글 아이디",
    unsigned: true,
  })
  trId: string;

  @Column("bigint", { name: "TB_ID", comment: "게시글 아이디", unsigned: true })
  tbId: string;

  @Column("varchar", {
    name: "TR_CONTENT",
    nullable: true,
    comment: "댓글 내용",
    length: 500,
  })
  trContent: string | null;

  @Column("varchar", { name: "TR_USERNAME", comment: "작성자", length: 20 })
  trUsername: string;

  @Column("datetime", {
    name: "TR_REGIST_DATE",
    nullable: true,
    comment: "등록일",
  })
  trRegistDate: Date | null;

  @Column("int", {
    name: "TR_DEPTH",
    nullable: true,
    comment: "댓글 레벨",
    default: () => "'0'",
  })
  trDepth: number | null;

  @Column("bigint", {
    name: "TR_PARENT_ID",
    nullable: true,
    comment: "댓글 부모아이디",
    unsigned: true,
  })
  trParentId: string | null;
}
